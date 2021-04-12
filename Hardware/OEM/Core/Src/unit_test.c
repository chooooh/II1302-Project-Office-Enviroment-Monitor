/**
******************************************************************************
@brief unit test for the office environment monitor project.
@details bla bla bla
@file unit_test.c
@author  Jonatan Lundqvist Silins, jonls@kth.se
@author  Sebastian Divander,       sdiv@kth.se
@date 29-03-2021
@version 1.0
******************************************************************************
*/

#include "unit_test.h"
#include "ESP8266.h"
#include "stdio.h"

static return_type simple = 	return_simple;
static return_type full = 		return_full;
static return_type cw_mode = 	return_cw_mode;
static return_type connection = return_connection;

void setUp(void){
}


void tearDown(void){

}

void test_ESP8266_AT(void){
	TEST_ASSERT_EQUAL_STRING("OK", ESP8266_send_command(ESP8266_AT, simple));
}

void test_ESP8266_AT_GMR(void){
	TEST_ASSERT_EQUAL_STRING("OK", ESP8266_send_command(ESP8266_AT_GMR, simple));
}

void test_ESP8266_AT_CWMODE_1(void){
	TEST_ASSERT_EQUAL_STRING("OK", ESP8266_send_command(ESP8266_AT_CWMODE_STATION_MODE, simple));
}

void test_ESP8266_AT_CWMODE_1_VERIFY(void){
	TEST_ASSERT_EQUAL_STRING("CWMODE:1", ESP8266_send_command(ESP8266_AT_CWMODE_TEST, cw_mode));
}

void test_ESP8266_AT_CWJAP_SET(void){
	char buffer[256] = {0};
	ESP8266_get_cwjap_command(buffer);
	TEST_ASSERT_EQUAL_STRING("OK", ESP8266_send_command(buffer, connection));
}

void test_ESP8266_AT_CWJAP_VERIFY(void){
	TEST_ASSERT_EQUAL_STRING("OK", ESP8266_send_command(ESP8266_AT_CWJAP_TEST, simple));
}

void unit_test(void){
	UNITY_BEGIN();
	//ESP8266_send_command("AT+RST\r\n", full);
	//ESP8266_send_command(ESP8266_AT, full);
	//ESP8266_send_command(ESP8266_AT_GMR, full);
	//ESP8266_send_command(ESP8266_AT_CWMODE_TEST, full);
//	ESP8266_send_command(ESP8266_AT_CWMODE_STATION_MODE, full);
//	ESP8266_send_command("AT+CWDHCP_CUR?\r\n", full);
	//ESP8266_send_command("AT+CWLAP\r\n", full);
	//ESP8266_send_command("AT+CWJAP=\"OnePlus 5\",\"123456789\"\r\n", full);
	//ESP8266_send_command(ESP8266_AT_CWJAP_TEST, full);
	RUN_TEST(test_ESP8266_AT);
	RUN_TEST(test_ESP8266_AT_GMR);
	RUN_TEST(test_ESP8266_AT_CWMODE_1);
	RUN_TEST(test_ESP8266_AT_CWMODE_1_VERIFY);
	//RUN_TEST(test_ESP8266_AT_CWJAP_SET);
	//RUN_TEST(test_ESP8266_AT_CWJAP_VERIFY);
	UNITY_END();
	while(1);
}
