/**
******************************************************************************
@brief functions for the ESP8266 wifi-module
@details
@file ESP8266.c
@author  Jonatan Lundqvist Silins, jonls@kth.se
@date 06-04-2021
@version 1.0
*******************************************************************************/
#include "ESP8266.h"

static uint8_t rx_variable;
static char rx_buffer[RX_BUFFER_SIZE];
static uint8_t rx_buffer_index = 0;

void init_uart_interrupt(void){
	HAL_UART_Receive_IT(&huart4, &rx_variable, 1);
}

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{

   if (huart->Instance == UART4) {
      rx_buffer[rx_buffer_index++] = rx_variable;    // Add 1 byte to Rx_Buffer
    }
      HAL_UART_Receive_IT(&huart4, &rx_variable, 1);
}

char* uart_send(const char* command, AT_RETURN_TYPE type){
	rx_buffer_index = 0;
	ERROR_FLAG = false;
	FAIL_FLAG = false;
	memset(rx_buffer, 0, RX_BUFFER_SIZE);
	HAL_UART_Transmit(&huart4, (uint8_t*) command, strlen(command), 100);

	// wait for OK
	while((strstr(rx_buffer, "OK\r\n") == NULL)){
		if(strstr(rx_buffer, "ERROR") != NULL){
			ERROR_FLAG = true;
			break; 									// implement flag here
		}
		if(strstr(rx_buffer, "FAIL") != NULL){
			FAIL_FLAG = true;
			break; 									// implement flag here
		}
	}

	switch (type) {
		case RETURN_AT_STATUS:
			if(ERROR_FLAG)
				return "ERROR";
			return "OK";

		case RETURN_FULL_BUFFER:
			return rx_buffer;

		case RETURN_CW_MODE_STATUS:
			if (strstr(rx_buffer, "CWMODE_CUR:1") != NULL)
				return "CWMODE:1";
			else if(strstr(rx_buffer, "CWMODE_CUR:2") != NULL)
				return "CWMODE:2";
			else if(strstr(rx_buffer, "CWMODE_CUR:3") != NULL)
				return "CWMODE:3";
			else
				return "CWMODE:?";

		case RETURN_CONNECTION_STATUS:
			if(FAIL_FLAG)
				if (strstr(rx_buffer, "CWJAP:1") != NULL)
					return "CWJAP:1 - connection timeout";
				else if((strstr(rx_buffer, "CWJAP:2") != NULL))
					return "CWJAP:2 - wrong password";
				else if((strstr(rx_buffer, "CWJAP:3") != NULL))
					return "CWJAP:3 - cannot find the target AP";
				else if((strstr(rx_buffer, "CWJAP:4") != NULL))
					return "CWJAP:4 - connection failed";
				else
					return "CWJAP:?";
			else {												// add connected return....
				if(strstr(rx_buffer, "No AP\r\n") != NULL)
					return "NO AP";
				else
					return "OK";
			}
		default:
			return "not implemented";
			break;
	}
}

void ESP8266_get_cwjap_command(char* ref){
	strcat(ref, ESP8266_AT_CWJAP_SET);
	strcat(ref,"\"");
	strcat(ref, SSID);
	strcat(ref, "\",\"");
	strcat(ref, PWD);
	strcat(ref, "\"");
	strcat(ref, CRLF);
	//sprintf (ref, "AT+CWJAP=\"%s\",\"%s\"\r\n", SSID, PWD);
}

