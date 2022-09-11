<?php

namespace Drupal\cloudfilt\Form;

use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\RequestException;

/**
 * Class CloudfiltConfigForm.
 */
class CloudfiltConfigForm extends ConfigFormBase {

  /**
   * Guzzle\Client instance.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;

  /**
   * \Drupal\Core\Messenger\MessengerInterface definition.
   *
   * @var \Drupal\Core\Messenger\MessengerInterface
   */
  protected $messenger;


  /**
   * @param \GuzzleHttp\ClientInterface $http_client
   *   The http client.
   * @param \Drupal\Core\Messenger\MessengerInterface $messenger
   *   The messenger interface.
   */
  public function __construct(ClientInterface $http_client, MessengerInterface $messenger) {
    $this->httpClient = $http_client;
    $this->messenger = $messenger;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('http_client'),
      $container->get('messenger')
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'cloudfilt.config',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'cloudfilt_config_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('cloudfilt.config');

    if ($config->get('key_site')) {
      // Display message when everything is properly set.
      $this->messenger->addMessage($this->t('CloudFilt is installed. To config and consult your dashboard go to <a href="@url" target="_blank">https://app.cloudfilt.com</a> and select your website.', ['@url' => 'https://app.cloudfilt.com']));
    }

    $form['settings'] = [
      '#type'  => 'details',
      '#description' => $this->t('Please go to your <a href="@url" target="_blank">Websites Page</a>, add or select your website and get your keys (Settings > Integration & Plugins).', ['@url' => 'https://app.cloudfilt.com/websites']),
      '#title' => $this->t('CloudFilt Settings'),
      '#open' => TRUE,
    ];
    $form['settings']['key_front'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Public Key'),
      '#maxlength' => 64,
      '#size' => 64,
      '#default_value' => $config->get('key_front') ? $config->get('key_front') : '',
      '#required' => TRUE,
    ];
    $form['settings']['key_back'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Private Key'),
      '#maxlength' => 64,
      '#size' => 64,
      '#default_value' => $config->get('key_back') ? $config->get('key_back') : '',
      '#required' => TRUE,
    ];

    // Restrict checking by role.
    $form['settings']['roles_exclude'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Restrict checking by role'),
      '#default_value' => $config->get('roles_exclude') ? $config->get('roles_exclude') : FALSE,
    ];

    // Get all roles.
    $roles = \Drupal::entityTypeManager()->getStorage('user_role')->loadMultiple();

    // Build the options array with roles.
    $options = [];
    foreach ($roles as $key => $value) {
      $options[$value->get('id')] = $value->get('label');
    }

    // Roles field.
    $form['settings']['roles'] = [
      '#type' => 'checkboxes',
      '#title' => $this->t('Do not check the following roles'),
      '#options' => $options,
      '#default_value' => $config->get('roles') ? $config->get('roles') : [],
      '#states' => [
        'visible' => [
          ':input[name="roles_exclude"]' => [
            'checked' => TRUE,
          ],
        ],
      ]
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);

    $result = $this->validateCloudfiltKeys(
      $form_state->getValue('key_front'),
      $form_state->getValue('key_back')
    );

    // Clear messages stack.
    $this->messenger->deleteAll();

    // If response is NO.
    if ($result['status'] == 'NO') {
      $form_state->setErrorByName('key_front', $this->t('Sorry, we could not validate your credentials. Please go to your <a href="@url" target="_blank">CloudFilt dashboard</a> to verify your keys.', ['@url' => 'https://app.cloudfilt.com']));
    }

    // If any exception.
    elseif ($result['status'] == 'E') {
      $form_state->setErrorByName('key_front', $this->t('@error. Please read our <a href="@faq" target="_blank">FAQ</a>.', ['@error' => $result['message'], '@faq' => 'https://app.cloudfilt.com/faq']));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $result = $this->validateCloudfiltKeys(
      $form_state->getValue('key_front'),
      $form_state->getValue('key_back')
    );

    $this->config('cloudfilt.config')
      ->set('key_front', $form_state->getValue('key_front'))
      ->set('key_back', $form_state->getValue('key_back'))
      ->set('key_site', $result['site'])
      ->set('roles_exclude', $form_state->getValue('roles_exclude'))
      ->set('roles', $form_state->getValue('roles'))
      ->save();
  }


  /**
   * Validate public/private key pair with CloudFilt service, and return site key.
   */
  protected function validateCloudfiltKeys($key_front, $key_back) {
    try {
      $request_url = 'https://api.cloudfilt.com/checkcms/drupal.php';

      // Send request to CloudFilt web service.
      $request = $this->httpClient->request('POST', $request_url, [
        'form_params' => [
          'key_front' => $key_front,
          'key_back' => $key_back,
        ],
      ]);

      return json_decode($request->getBody()->getContents(), TRUE);
    }
    catch (RequestException $e) {
      return [
        'status' => 'E',
        'message' => $e->getMessage(),
      ];
    }
  }

}
