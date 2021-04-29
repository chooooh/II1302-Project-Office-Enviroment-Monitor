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

/* CCS881 registers */
#define CCS881_ADDR 	0xB6 	// Default I2C Address, shifted 1 bit to the left because HAL
#define STATUS_REG 		0x00	// Status register, R, 1 byte
#define MEAS_MODE 		0x01	// Measurement mode and conditions register, R/W, 1 byte
#define ALG_RES_DATA 	0x02	// Algorithm result, R, 8 bytes
#define RAWDATAREG 		0x03	// ?
#define HW_ID 			0x20 	// Hardware ID, R, 1 byte, should be 0x81
#define APP_START		0xF4	// Application start
#define ERROR_ID		0xE0    // Reported errors, R, 1 byte
#define MEAS_MODE_1 	0x10	// Set to measure each second
#define SW_RESET		0xFF	// Register for resetting the device, W, 4 bytes

/* BME280 registers */
#define BME280_ADDR		0xEE	// 0x77 shifted to the left 1 bit, because HAL
#define ID_REG			0xD0	// Read id, should be 0x60
#define CTRL_MEAS		0xF4 	// Control register for measu
#define BME280_STATUS	0xF3	// Status register
#define HUM_LSB			0xFE	// Humidity lsb
#define HUM_MSB			0xFD	// Humidity msb
#define TEMP_XLSB		0xFC	// Temp bits 7-4
#define TEMP_LSB		0xFB	// Temp lsb
#define TEMP_MSB		0xFA	// Temp msb
#define dig_T1_reg		0x88
#define dig_T2_reg		0x8A
#define dig_T3_reg		0x8C
#define dig_H1_reg		0xA1
#define dig_H2_reg		0xE1
#define dig_H3_reg		0xE3
#define dig_H4_reg		0xE4
#define dig_H5_reg		0xE5
#define dig_H6_reg		0xE7


/* Compensation register values based on BME280 datasheet */
uint16_t dig_T1;
int16_t  dig_T2;
int16_t  dig_T3;
uint8_t  dig_H1;
int16_t  dig_H2;
uint8_t  dig_H3;
int16_t  dig_H4;
int16_t  dig_H5;
int8_t   dig_H6;


typedef enum
{
	CCS881_SUCCESS = 0,		// Success status
	CCS881_ERROR, 			// Some internal sensor error, error status set
	CCS881_ID_ERR, 			// HW ID returns a bad value
	CCS881_SAT_ERR,			// if a reading is out of bounds, saturated etc
	CCS881_I2C_ERROR, 		// error when writing/reading a register with i2c
	BME280_SUCCESS,
	BME280_ERROR,
	BME280_ID_ERR,
	BME280_I2C_ERROR
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
CCS881_app_start(void);

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

SENSOR_STATUS
BME280_read_register(uint8_t reg_addr, uint8_t* buffer);

SENSOR_STATUS
BME280_init(void);

#endif /* INC_CCS811_BME280_H_ */
