/**
******************************************************************************
@brief Header for the office environment monitor main program
@file office_environment_monitor.h
@author Jonatan Lundqvist Silins, jonls@kth.se
******************************************************************************
*/

#include <stdio.h>
#include <ESP8266.h>

/* Status codes */
typedef enum
{
	ERROR_STATUS = 0,
	SUCCESS_STATUS,
} RETURN_STATUS;

/**
 *
 */
void office_environment_monitor(void);

/**
 *
 */
RETURN_STATUS get_return_status(void);

/**
 *
 */
void set_return_status(RETURN_STATUS status_code);
