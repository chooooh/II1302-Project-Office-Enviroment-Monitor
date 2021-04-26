/*
 * lsf.h
 *
 *  Created on: Apr 6, 2021
 *      Author: Sebastian Divander, sdiv@kth.se
 *   last upd.: Apr 6, 2021
 */

#ifndef INC_LSF_H_
#define INC_LSF_H_

#include <stdint.h>

uint8_t initialize_sensor(void);
uint8_t assert_sensor_has_started(void);
uint8_t assert_no_error(void);
uint8_t access_status_register(void);
uint8_t set_mode(uint8_t);
void receive_data(void);

void error_response(void);

#endif /* INC_LSF_H_ */
