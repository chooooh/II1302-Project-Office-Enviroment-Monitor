/**
******************************************************************************
@brief functions for the ESP8266 wifi-module
@details
@file ESP8266.c
@author  Jonatan Lundqvist Silins, jonls@kth.se
@date 06-04-2021
@version 1.1
*******************************************************************************/
#include "ESP8266.h"

static uint8_t rx_variable;
static char rx_buffer[RX_BUFFER_SIZE];
static uint8_t rx_buffer_index = 0;
static bool ERROR_FLAG = false;
static bool FAIL_FLAG = false;


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

/* djb2 hashing algorithm */
const unsigned long hash(const char *str) {
    unsigned long hash = 5381;
    int c;

    while ((c = *str++))
        hash = ((hash << 5) + hash) + c;
    return hash;
}

const char* uart_send(const char* command){

	rx_buffer_index = 0;
	ERROR_FLAG = false;
	FAIL_FLAG = false;

	memset(rx_buffer, 0, RX_BUFFER_SIZE);
	HAL_UART_Transmit(&huart4, (uint8_t*) command, strlen(command), 100);

	// wait for OK or ERROR/FAIL
	while((strstr(rx_buffer, ESP8266_AT_OK_TERMINATOR) == NULL)){
		if(strstr(rx_buffer, ESP8266_AT_ERROR) != NULL){
			ERROR_FLAG = true;
			break;
		}
		if(strstr(rx_buffer, ESP8266_AT_FAIL) != NULL){
			FAIL_FLAG = true;
			break;
		}
	}

	return get_return(command);
}


void ESP8266_get_wifi_command(char* ref){
	/*
	strcat(ref, ESP8266_AT_CWJAP_SET);
	strcat(ref,"\"");
	strcat(ref, SSID);
	strcat(ref, "\",\"");
	strcat(ref, PWD);
	strcat(ref, "\"");
	strcat(ref, CRLF);
	*/
	sprintf (ref, "AT+CWJAP=\"%s\",\"%s\"\r\n", SSID, PWD);
}

const char* get_return(const char* command){

	if(strstr(command, ESP8266_AT_CWJAP_SET) != NULL)
		command = ESP8266_AT_CWJAP_SET;

	KEYS return_type = hash(command);
	switch (return_type) {

		case ESP8266_AT_KEY:
			return evaluate(ERROR_FLAG, FAIL_FLAG);

		case ESP8266_AT_GMR_KEY:
			return evaluate(ERROR_FLAG, FAIL_FLAG);

		case ESP8266_AT_RST_KEY:
			return evaluate(ERROR_FLAG, FAIL_FLAG);

		case ESP8266_AT_CWMODE_STATION_MODE_KEY:
			return evaluate(ERROR_FLAG, FAIL_FLAG);

		case ESP8266_AT_CWQAP_KEY:
			return evaluate(ERROR_FLAG, FAIL_FLAG);

		case ESP8266_AT_CWMODE_TEST_KEY:
			if(ERROR_FLAG || FAIL_FLAG)
				return ESP8266_AT_ERROR;
			else {
				if (strstr(rx_buffer, ESP8266_AT_CWMODE_1) != NULL)
					return ESP8266_AT_CWMODE_1;
				else if(strstr(rx_buffer, ESP8266_AT_CWMODE_2) != NULL)
					return ESP8266_AT_CWMODE_2;
				else if(strstr(rx_buffer, ESP8266_AT_CWMODE_3) != NULL)
					return ESP8266_AT_CWMODE_3;
				else
					return ESP8266_AT_UNKNOWN;
			}

		case ESP8266_AT_CWJAP_TEST_KEY:
			if(ERROR_FLAG || FAIL_FLAG)
				return ESP8266_AT_ERROR;
			else {
				if(strstr(rx_buffer, ESP8266_AT_NO_AP))
					return ESP8266_AT_WIFI_DISCONNECTED;
				else
					return ESP8266_AT_WIFI_CONNECTED;
			}


		case ESP8266_AT_CWJAP_SET_KEY:
			if(FAIL_FLAG){
				if (strstr(rx_buffer, ESP8266_AT_CWJAP_1) != NULL)
					return ESP8266_AT_TIMEOUT;
				else if((strstr(rx_buffer, ESP8266_AT_CWJAP_2) != NULL))
					return ESP8266_AT_WRONG_PWD;
				else if((strstr(rx_buffer, ESP8266_AT_CWJAP_3) != NULL))
					return ESP8266_AT_NO_TARGET;
				else if((strstr(rx_buffer, ESP8266_AT_CWJAP_4) != NULL))
					return ESP8266_AT_CONNECTION_FAIL;
				else
					return ESP8266_AT_UNKNOWN;
			}
			else
				return ESP8266_AT_GOT_IP;


		case ESP8266_AT_CIPMUX_KEY:
			return evaluate(ERROR_FLAG, FAIL_FLAG);

		case ESP8266_AT_CIPMUX_TEST_KEY:
			if(ERROR_FLAG || FAIL_FLAG)
				return ESP8266_AT_ERROR;
			else {
				if (strstr(rx_buffer, ESP8266_AT_CIPMUX_0) != NULL)
					return ESP8266_AT_CIPMUX_0;
				else
					return ESP8266_AT_CIPMUX_1;
			}

		default:
			return NOT_IMPLEMENTED;
			break;
	}
}

const char* evaluate(bool ERROR_FLAG, bool FAIL_FLAG){
	if(ERROR_FLAG || FAIL_FLAG)
		return ESP8266_AT_ERROR;
	return ESP8266_AT_OK;
}
