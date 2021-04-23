/**
******************************************************************************
@brief main program for the office environment monitor project.
@details bla bla bla
@file office_environment_monitor.c
@author  Jonatan Lundqvist Silins, jonls@kth.se
@author  Sebastian Divander,       sdiv@kth.se
@date 29-03-2021
@version 1.0
******************************************************************************
*/


#include "office_environment_monitor.h"

/* Current return status */
static RETURN_STATUS current_status;

void office_environment_monitor(void){

	if(esp8266_start() == ESP8266_INIT_ERROR_STATUS)
		error_handler();

	for(;;){

	}
}


void error_handler(void){
	while(1);
}

RETURN_STATUS esp8266_start(void){
	init_uart_interrupt();
	if(strcmp(esp8266_init(), ESP8266_AT_OK) != 0){
		current_status = ESP8266_INIT_ERROR_STATUS;
		return current_status;
	}
	current_status = ESP8266_INIT_SUCCESS_STATUS;
	return current_status;
}


