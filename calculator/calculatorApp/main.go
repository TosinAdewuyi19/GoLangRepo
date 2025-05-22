git apackage main

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.POST("/calculate", func(c *gin.Context) {
		operand1 := c.PostForm("operand1")
		operand2 := c.PostForm("operand2")
		operator := c.PostForm("operator")

		num1, err1 := strconv.ParseFloat(operand1, 64)
		num2, err2 := strconv.ParseFloat(operand2, 64)

		if err1 != nil || err2 != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid operands"})
			return
		}

		var result float64
		var err error

		switch operator {
		case "+":
			result = num1 + num2
		case "-":
			result = num1 - num2
		case "*":
			result = num1 * num2
		case "/":
			if num2 == 0 {
				err = http.ErrBodyNotAllowed
			} else {
				result = num1 / num2
			}
		default:
			err = http.ErrNotSupported
		}

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid operation"})
		} else {
			c.JSON(http.StatusOK, gin.H{"result": result})
		}
	})

	err := r.Run(":8080")
	if err != nil {
		return
	}
}
