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
void test_ESP8266_AT_RST(void);
void test_ESP8266_AT(void);
void test_ESP8266_AT_GMR(void);
void test_ESP8266_AT_CWQAP(void);
void test_ESP8266_AT_CWMODE_1(void);
void test_ESP8266_AT_CWMODE_1_VERIFY(void);
void test_ESP8266_AT_CWJAP_SET(void);
void test_ESP8266_AT_CWJAP_VERIFY(void);
void test_ESP8266_AT_CIPMUX_SET(void);
void test_ESP8266_CIPMUX_VERIFY(void);
void HAL_UART_RxCpltCallback(UART_HandleTypeDef*);

