const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/init/routes']

swaggerAutogen(outputFile, endpointsFiles)