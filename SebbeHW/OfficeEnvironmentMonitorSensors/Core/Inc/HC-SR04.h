/*
 * ultra.h
 *
 *  Created on: 26 apr. 2021
 *      Author: Sebastian Divander, sdiv@kth.se
 */

#ifndef INC_HC_SR04_H_
#define INC_HC_SR04_H_

#include <stdint.h>

void HCSR04_01_send_trigger(void);
void HCSR04_02_send_trigger(void);
void HCSR04_01_start_echotim(void);
void HCSR04_02_start_echotim(void);
void HCSR04_01_stop_echotim(void);
void HCSR04_02_stop_echotim(void);
float HCSR04_01_measure_distance(void);
float HCSR04_02_measure_distance(void);

#endif /* INC_HC_SR04_H_ */
