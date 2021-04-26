/*
 * testfil.h
 *
 *  Created on: 21 apr. 2021
 *      Author: Sebastian Divander, sdiv@kth.se
 */

#ifndef INC_TESTFIL_H_
#define INC_TESTFIL_H_

#include "unity.h"

void setUp(void);
void tearDown(void);
void unit_test(void);
void test_lsf_start(void);
void test_lsf_data_recv(void);
void test_hc04_start_01(void);
void test_hc04_start_02(void);
void test_hc04_measure_01(void);
void test_hc04_measure_02(void);
void test_buzzer_start(void);
void test_buzzer_sound(void);

#endif /* INC_TESTFIL_H_ */
