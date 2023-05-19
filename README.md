![Itbalogo](itbalogo.png)

# TP 3 grupo 8
## ¿De que trata nuestro trabajo?

*Buscamos poder gestionar y almacenar los registros médicos a través de una interfaz rápida y sencilla, para poder a través de clicks encontrar y actualizar la información de los pacientes*. 

## Módulos utilizados

* API Gateway: Recibe los request de CloudFront y los distribuye a las lambdas, en caso de que haya una respuesta la envia a CloudFront para que este se la mande al usuario.

* CloudFront: Se utiliza para agilizar los pedidos de los usuarios, este los distribuye al bucket de front end o a la API Gateway, segun sea el caso.

* LAMBDA: Definimos 2 lambdas. Una se encarga de realizar un escaneo a la base de datos y la otra busca un registro en un buckets. 

* S3: Definimos 3 buckets. Uno para logs, uno para el frontend que te dirige al sitio y el ultimo es donde se guardan las historias medicas. 

* VPC: Crea una VPC con subredes privadas en todas las AZ disponibles. Tambien crea los VPC endpoints necesarios (como por ejemplo, el que se utiliza para comunicarse con la base de datos).

* DynamoDB: Lo implementamos usando un modulo externo (link: terraform-aws-modules/dynamodb-table/aws). Este genera las tablas de la base de datos.


# Funciones 

Se usaron varias funciones. Se destacan:

* Flatten: Lo utilizamos para concatenar las 2 listas de CIDR_blocks que teniamos, ya que el security group de la lambda nos pedia que esten todos en la misma lista.

* Cidersubnet: Lo utilizamos para conseguir los CIDR block de las subredes a partir de CIDR block de la vpc.

* Filebase64sha256: Lo utilizamos para cuando se hace un apply terraform se detecte que se cambio el codigo de la lambda, y este aplique el cambio. 

* Replace: Lo utilizamos para extraer el dominio de la API Gateway de la variable invoke_url y utilizar esta como domain_name al conectarlo con la CDN.

# Meta-argumentos

* Count: Lo utilizamos para dos funciones diferentes. Por un lado, se uso en el modulo vpc para crear subredes segun la cantidad de AZ disponibles. Por otro lado, se uso en los buckets s3 como boolean para crear la configuracion de pagina web en caso de que se provea la informacion necesaria.

* For each: Lo utilizamos para generar las lambdas que se pasan en la variable `var.lambdas` y para asignarle los permisos necesarios.

* Lifecycle: Lo utilizamos para especificarle a terraform que debe crear un nuevo recurso de API Gateway antes de eliminar uno existente.

# Arquitectura     
![image](arquitectura_modificada.png)