<?php

namespace Drupal\smart_date\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'smartdate_only' widget.
 *
 * @FieldWidget(
 *   id = "smartdate_only",
 *   label = @Translation("Smart Date, date-only range"),
 *   field_types = {
 *     "smartdate",
 *     "daterange"
 *   }
 * )
 */
class SmartDateOnlyWidget extends SmartDateInlineWidget {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $element = parent::formElement($items, $delta, $element, $form, $form_state);

    // Hide the time elements.
    $element['time_wrapper']['value']['#date_time_format'] = '';
    $element['time_wrapper']['value']['#date_time_element'] = 'none';
    $element['time_wrapper']['end_value']['#date_time_format'] = '';
    $element['time_wrapper']['end_value']['#date_time_element'] = 'none';

    $element['duration']['#access'] = FALSE;
    $form['#attached']['library'] = ['smart_date/date_only'];

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function massageFormValues(array $values, array $form, FormStateInterface $form_state) {

    // The widget form element type has transformed the value to a
    // DrupalDateTime object at this point. We need to convert it back to the
    // storage timestamp.
    foreach ($values as &$item) {
      if (isset($item['time_wrapper']['value'])) {
        $item['value'] = $item['time_wrapper']['value'];
      }
      if (isset($item['time_wrapper']['end_value'])) {
        $item['end_value'] = $item['time_wrapper']['end_value'];
      }
      // Force to all day.
      $item['value']->setTime(0, 0, 0);
      $item['end_value']->setTime(23, 59, 0);
    }
    $values = parent::massageFormValues($values, $form, $form_state);
    return $values;
  }

}
