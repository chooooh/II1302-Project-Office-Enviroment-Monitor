/*
 * disp.h
 *
 *  Created on: Apr 27, 2021
 *      Author: Sebastian Divander,       sdiv@kth.se
 *              Jonatan Lundqvist Silins, jonls@kth.se
 */

#ifndef INC_DISP_H_
#define INC_DISP_H_

#include "i2c.h"
#include "fonts.h"

/*
 * @brief Enumeration of colours for the display¨: black or White
 */
typedef enum
{
	BLACK,
	WHITE
} Display_ColourDef;

/*
 * @brief Display object structs for information about the display
 * @var thisX - current Xposition in the display buffer
 * @var thisY - current Yposition in the display buffer
 */
typedef struct {
    uint16_t thisX;
    uint16_t thisY;
} Display_t;

/*
 * Function prototype declaration
 */
void display_init(void);
uint8_t command(uint8_t);
uint8_t data(uint8_t);
void draw_pixel(uint8_t, uint8_t, Display_ColourDef);
void reset_screen_canvas(void);
void retry(void);
void display_update(void);
void display_write_char(char, FontDef, Display_ColourDef);
void display_write_string(char*, Display_ColourDef);
void display_set_position(uint8_t, uint8_t);
void display_error_message(void);

#endif /* INC_DISP_H_ */
