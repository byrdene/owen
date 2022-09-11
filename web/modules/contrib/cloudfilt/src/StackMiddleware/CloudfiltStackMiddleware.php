<?php

namespace Drupal\cloudfilt\StackMiddleware;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use GuzzleHttp\ClientInterface;
use Drupal\user\Entity\User;

/**
 * Performs a custom task.
 */
class CloudfiltStackMiddleware implements HttpKernelInterface {

  /**
   * The wrapped HTTP kernel.
   *
   * @var \Symfony\Component\HttpKernel\HttpKernelInterface
   */
  protected $httpKernel;

  /**
   * Guzzle\Client instance.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;

  /**
   * The config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * Creates a HTTP middleware handler.
   *
   * @param \Symfony\Component\HttpKernel\HttpKernelInterface $kernel
   *   The HTTP kernel.
   * @param \GuzzleHttp\ClientInterface $http_client
   *   The http client.
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The configuration factory.
   */
  public function __construct(HttpKernelInterface $kernel, ClientInterface $http_client, ConfigFactoryInterface $config_factory) {
    $this->httpKernel = $kernel;
    $this->httpClient = $http_client;
    $this->configFactory = $config_factory;
  }

  /**
   * Filter requests.
   */
  private function filterRequest($request, &$response) {
    // Load configs.
    $config = $this->configFactory->get('cloudfilt.config');

    // Get user IP.
    $user_ip = $request->getClientIp();

    // Get current Request URI.
    $user_request_uri = $request->getUri();

    // Send request to CloudFilt web service.
    $cloudfilt_url = 'https://api' . $config->get('key_site') . '.cloudfilt.com/phpcurl';
    $cloudfilt_request = $this->httpClient->request('POST', $cloudfilt_url, [
      'form_params' => [
        'ip' => $user_ip,
        'KEY' => $config->get('key_back'),
        'URL' => $user_request_uri,
      ],
      'timeout' => 1,
    ]);
    $cloudfilt_response = $cloudfilt_request->getBody()->getContents();

    // If CloudFilt does not accept the request.
    if (!empty($cloudfilt_response) && $cloudfilt_response != 'OK') {
      // Build headers.
      $headers = [
        'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0',
        'Pragma' => 'no-cache'
      ];

      // Build redirect URL.
      $url = 'https://cloudfilt.com/stop-' . $user_ip . '-' . $config->get('key_front');

      // Redirect request to CloudFilt.
      $response = new RedirectResponse($url, 307, $headers);
    }
  }

  /**
   * {@inheritdoc}
   */
  public function handle(Request $request, $type = self::MASTER_REQUEST, $catch = TRUE) {
    $response = $this->httpKernel->handle($request, $type, $catch);

    // Load configs.
    $config = $this->configFactory->get('cloudfilt.config');

    // Only run if CloudFilt keys are stored.
    if ($config->get('key_site')) {
      // If excluded roles.
      if ($config->get('roles_exclude')) {
        // Get current user account.
        $account = User::load(\Drupal::currentUser()->id());

        // Skip the excluded roles.
        if (!array_intersect($config->get('roles'), $account->getRoles())) {
          $this->filterRequest($request, $response);
        }
      }
      else {
        $this->filterRequest($request, $response);
      }
    }

    return $response;
  }
}
