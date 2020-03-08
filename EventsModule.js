//Working with events modules 

/**
 * Event emitter - one of the core module among all
 */

 // note that EventEmitter is a class (every 1st letter is UpperCase)
 const EventEmitter = require('events');    //importing events module

 //emitter is an object
 const emitter = new EventEmitter();      // creating a instance of the class , i.e object

 //Register a listener
 emitter.on('messageLogged',function(){
    console.log('Listener Called !');
 });
 
 //emit means making a noise , here emit means 
 emitter.emit('messageLogged');    //Raises an event
 
// The order is important
/**
 * Here on raising an event, it calls the listener function
 */

 // ---------------------------- EVENT ARGUMETNS ------------------------------------
 emitter.on('messageLogged2',function(arg){
     console.log('Listener 2 called! These are the args :',arg)
 })
 emitter.emit('messageLogged2', {id: 1, url: 'http://'});    //listener will recieve args as well

 //With this technique we can pass data

 /**
  * Alternative - USE ARROW FUNCTION
  * emitter.on('messageLogged',(arg)=>{
  *     ..Statements 
  * })
  */

