/**
******************************************************************************
@brief header for the CCS811 & BME280 sensor functions.
@details bla bla bla
@file CCS811_BME280.h
@author  Sebastian Divander,       sdiv@kth.se
@author  Jonatan Lundqvist Silins, jonls@kth.se
@date 06-04-2021
@version 1.0
******************************************************************************
*/


#ifndef INC_CCS811_BME280_H_
#define INC_CCS811_BME280_H_


#include "i2c.h"

#define DEVICE_ADDR 	0xB6 	// Default I2C Address
#define STATUS_REG 		0x00	// Status register, R, 1 byte
#define MEAS_MODE 		0x01	// Measurement mode and conditions register, R/W, 1 byte
#define ALG_RES_DATA 	0x02	// Algorithm result, R, 8 bytes
#define RAWDATAREG 		0x03	// ?
#define HW_ID 			0x20 	// Hardware ID, R, 1 byte, should be 0x81
#define APP_START		0xF4	// Application start
#define ERROR_ID		0xE0    // Reported errors, R, 1 byte
#define MEAS_MODE_1 	0x10
#define SW_RESET		0xFF	// Register for resetting the device, W, 4 bytes

typedef enum
{
	CCS881_SUCCESS = 0,		// Success status
	CCS881_ERROR, 			// Some internal sensor error, error status set
	CCS881_ID_ERR, 			// HW ID returns a bad value
	CCS881_SAT_ERR,			// if a reading is out of bounds, saturated etc
	CCS881_I2C_ERROR 		// error when writing/reading a register with i2c
} SENSOR_STATUS;


/**
 *
 */
SENSOR_STATUS
CCS811_read_register(uint8_t reg_addr, uint8_t* buffer);

/**
 *
 */
SENSOR_STATUS
CCS811_write_register(uint8_t reg_addr, uint8_t* buffer, uint8_t size);

/**
 *
 */
SENSOR_STATUS
CCS881_init(void);

/**
 *
 */
uint8_t
CCS811_read_status_error(void);

/**
 *
 */
uint8_t
CCS811_read_error_id(void);

/**
 *
 */
uint8_t
CCS811_read_app_valid(void);

/**
 *
 */
SENSOR_STATUS
CCS811_write_mode(uint8_t mode);

/**
 *
 */
SENSOR_STATUS
CCS881_reset(void);

#endif /* INC_CCS811_BME280_H_ */
