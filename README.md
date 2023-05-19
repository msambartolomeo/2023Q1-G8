![Itbalogo](itbalogo.png)

# TP 3 grupo 8
## ¿De que trata nuestro trabajo?

*Buscamos poder gestionar y almacenar los registros médicos a través de una interfaz rápida y sencilla, para poder a través de clicks encontrar y actualizar la información de los pacientes*. 

## Deployment
Para deployear el repositorio se necesita proveer un archivo terraform.tfvars con las variables necesarias.
Se provee un archivo de ejemplo [terraform.example.tfvars](./terraform/organization/terraform.example.tfvars)
(Si hay un problema de nombres de los buckets esto puede ser editado en el archivo de variables)

## Modulos utilizados

* API Gateway: Recibe los request de CloudFront y los distribuye a las lambdas. Se definen los endpoints en formato json y se calcula su hash para redeployearlos cuando haya algun cambio

* CloudFront: Se utiliza para agilizar los pedidos de los usuarios. Define las politicas de cacheo y el *routing* hacie el sitio web estático y hacia la api gateway

* Lambda: Definimos 2 lambdas. GetHistory y GetUser como ejemplo de las lambdas de nuestra aplicación. La primera conecta al bucket de registros y obtiene un historial medico *harcoded* y la segunda se conecta a la tabla de dynamo de pacientes y simplemente hace un *scan*. Si bien no tienen la logica de su nombre estan hechas para mostrar que esta configurada la conexión. En un futuro se deberan crear el resto de lambdas y hacer la logica de nuestra app en ellas. Se hace el deploy de todas las lambdas en todas las subredes creadas por el modulo vpc

* S3: El modulo de S3 se utiliza para puede crear buckets que cumplan la funcion de website o que no la cumplan de manera condicional. Lo utilizamos tres veces, una para crear nuestra website estática, otro para los logs de esta (no se separo en bucket www y bucket dominio porque todavia no poseemos un dominio), y otro para guardar los historiales médicos.

* VPC: El modulo vpc crea una VPC con subredes privadas en todas las AZ disponibles en la region. Tambien crea los VPC endpoints necesarios (como por ejemplo, el que se utiliza para comunicarse con la base de datos).

* DynamoDB: Lo implementamos usando un modulo externo [terraform-aws-modules/dynamodb-table/aws](https://registry.terraform.io/modules/terraform-aws-modules/dynamodb-table/aws/latest). Este genera las tablas de pacientes y medicos de la base de datos.

# Componentes a evaluar
- Lambda
- Api Gateway
- Cloudfront
- S3
- VPC
- DynamoDB

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
