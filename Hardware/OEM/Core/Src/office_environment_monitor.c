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
static RETURN_STATUS return_status;

void office_environment_monitor(void){


	for(;;){

	}
}

/* Get return status*/
RETURN_STATUS get_return_status(void){
	return return_status;
}

/* Set return status */
void set_return_status(RETURN_STATUS status_code){
	return_status = status_code;
}
