# README.md

## Descrição do Projeto

Este projeto fornece uma API REST em Java com Spring Boot para persistir leituras de sensores em um banco de dados H2 no modo *file*. Ele permite criar, listar e buscar leituras completas de sensores via endpoints HTTP.

## Tecnologias Utilizadas

* Java 17+
* Spring Boot 3.x
* Spring Data JPA
* H2 Database (modo *file*)
* Maven

## Pré-requisitos

* JDK 17 ou superior instalado
* Maven (embutido via `./mvnw`)
* Git

## Como Executar

1. Clone este repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd readings_api
   ```
2. Compile e execute a aplicação:

   ```bash
   ./mvnw clean spring-boot:run
   ```
3. A API ficará disponível em `http://localhost:8080`.

## Banco de Dados H2

* O arquivo de dados será criado em:

  ```
  ./data/readings.mv.db
  ```
* Console web do H2:

  * URL: `http://localhost:8080/h2-console`
  * JDBC URL: `jdbc:h2:file:./data/readings`
  * Usuário: `sa`
  * Senha: (vazio)

> Para resetar o banco, basta parar a aplicação e excluir os arquivos `readings.mv.db` e `readings.trace.db` na pasta `./data/`.

## Endpoints Disponíveis

| Método | URL                  | Descrição                               |
| ------ | -------------------- | --------------------------------------- |
| POST   | `/api/readings`      | Insere ou atualiza uma leitura completa |
| GET    | `/api/readings`      | Lista todas as leituras                 |
| GET    | `/api/readings/{id}` | Retorna a leitura pelo seu ID           |

### Exemplo de Requisições cURL

* **POST** `/api/readings`:

  ```bash
  curl -X POST http://localhost:8080/api/readings \
    -H "Content-Type: application/json" \
    -d '{
      "id": "1",
      "name": "Termometer 6738 Pro",
      "type": "Temperatura",
      "description": "Sensor de temperatura do ambiente da linha de produção.",
      "unit": "°C",
      "value": 23.7,
      "status": "OK",
      "statusDescription": "Funcionando normalmente.",
      "history": [22.8, 23.2, 23.5, 23.7, 23.6, 23.7],
      "minValue": 22.5,
      "maxValue": 23.6
    }'
  ```

* **GET** todas as leituras:

  ```bash
  curl http://localhost:8080/api/readings
  ```

* **GET** leitura por ID:

  ```bash
  curl http://localhost:8080/api/readings/1
  ```

## Coleção Postman

Importe o arquivo `SensorReadingsAPI.postman_collection.json` disponível na raiz do projeto para testar os endpoints no Postman.

## Integrantes do Grupo

* Alexandre Moreira da Silva Junior – RM 98621
* Fernando Borelli – RM 98343
* Giovanna Ferro Menis – RM 99639
* João Marco Oliveira Pereira – RM 97777
* Luiz Fernando Della Colette Pombo Lema – RM 558735
