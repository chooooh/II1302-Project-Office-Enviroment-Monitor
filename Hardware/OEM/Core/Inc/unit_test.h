/**
******************************************************************************
@brief Header for the project unit test
@file unit_test.h
@author Jonatan Lundqvist Silins, jonls@kth.se
******************************************************************************
*/

#include "unity.h"
#include "usart.h"
#include "ESP8266.h"
#include "stdio.h"

void unit_test(void);
void setUp(void);
void tearDown(void);
void test_esp8266_init(void);
void test_esp8266_at_rst(void);
void test_esp8266_at(void);
void test_esp8266_at_cwqap(void);
void test_esp8266_at_cwmode_1(void);
void test_esp8266_at_cwmode_1_verify(void);
void test_esp8266_at_cwjap_verify(void);
void test_esp8266_at_cipmux_set_single(void);
void test_esp8266_at_cipmux_verify(void);
void test_esp8266_wifi_connect(void);
void test_esp8266_web_connection(void);
void test_esp8266_web_request(void);
void test_esp8266_at_send(char*);
void test_esp8266_send_data(char*);
void HAL_UART_RxCpltCallback(UART_HandleTypeDef*);

