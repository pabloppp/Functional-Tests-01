# SWIPE TO DELETE
AngularJS directive to create the 'swipe to delete' functionality in lists or whatever you want.

Allows swipe right & left.

Exposes 3 events for every list item: 

**swipe-left**: Trigger when the user fully swiped the element to the left, the object *$event* contains some usefull things

**swipe-right**: Same as above but triggered when swiping to the right.

**swiping**: Triggered when the user is swiping the item (carefull, the event is triggered with every movement). The object *$event* contains info about the swipping (nº of pixels swipped, width of the parent element, etc)

No full description yet, just look at the code.