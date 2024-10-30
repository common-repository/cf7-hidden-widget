/* 
 ** Contact Form 7 - Hidden Widget 
 ** Get widget element DOM and add content when a event is fired
 *
 * @since 0.1
 */

//Return current status of DOM
$docStatus = document.readyState;

//Check status and continue function
if ($docStatus != 'uninitialized' || $docStatus != 'loading') {

    cc7_hw_widget_content.forEach(function(currentValue, index) {

        document.addEventListener(currentValue.event, function(event) {

            //Stop function if the ID not exist
            if (event.detail.contactFormId != currentValue.id ||
                currentValue.id == undefined) {
                console.error('CC7_HW: The "ID" not match! Verify if Wordpress save widget configuration sucessufully.');
                return;
            }

            //Stop function if widget_id is not defined
            if (currentValue.widget_id == '' ||
                currentValue.widget_id == undefined) {
                console.error('CC7_HW: The atribute "id" for widget is not defined! Verify if Wordpress save widget configuration sucessufully.');
                return;
            }

            //Create a custom event to future interation
            var customEvent = new Event('cc7_hw_add_content_event');

            //Get certain widget element
            $widgetElement = document.querySelector('#' + currentValue.widget_id + '.widget.cc7_hw_widget');

            //Listen event and implement function to add content
            $widgetElement.addEventListener('cc7_hw_add_content_event', function(e) {
                console.log(e);
                //Add content for certain widget
                e.target.innerHTML = currentValue.content;
            }, false);

            //Fire event registered
            $widgetElement.dispatchEvent(customEvent);

        }, false);

    });

}