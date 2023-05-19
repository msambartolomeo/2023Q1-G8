# Holaa 👋
# Somos el grupo 8 !

![Itbalogo](https://github.com/Amparo1999/amparo1999/assets/116674796/cf4e4554-7b48-479c-b610-58ebedaf4f4c )




## ¿De que trata nuestro trabajo?

*Buscamos poder gestionar y almacenar los registros médicos a través de una interfaz rápida y sencilla, para poder a través de clics encontrar y actualizar la información de los pacientes*. 

## Módulos utilizados 

* APIGW 

Construye una API REST que va recibir requests una de ingreso y otra de egreso.Depende del request a la lambdas que ira.

* CloudFront 

Funciona como CDN y realiza caché de la API y del S3 (que hostea el sitio estático)

* LAMBDA 

Definimos 2 lambdas. Una se encarga de realizar escrituras al ingreso y la otra de realizar lecturas salida del usuario. 

* S3 

Definimos 3 cubos. Uno para logs y dos para el frontend que te dirige al sitio 

* VPC 

Este módulo es externo. Se define en este toda la parte de networking que se detalla en el diagrama de la arquitectura (el cual se encuentra al final de este documento).



# Funciones 





# Arquitecturar     

## Y esta es nuestra arquitectura solo con las piezas elegidas 


![image](arquitectura_modificada.png)



