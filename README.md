# README.md

## Descrição do Projeto

Este projeto fornece uma API REST em Java com Spring Boot para persistir leituras de sensores em um banco de dados H2 no modo *file*. Ele permite criar, listar e buscar leituras completas de sensores via endpoints HTTP.

## Tecnologias Utilizadas

* Java 17+
* Spring Boot 3.x
* Spring Data JPA
* H2 Database (modo *file*)
* Maven
* JWT para autenticação (simples, em memória)

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

## Autenticação (JWT)

A aplicação expõe um endpoint de login que retorna um JWT e o email usado no login.

- Endpoint de login (sem autenticação): POST `/api/auth/login`  
  - Body (JSON):
    ```json
    {
      "email": "User",
      "password": "00000"
    }
    ```
  - Resposta (exemplo) — status 200:
    ```json
    {
      "token": "<jwt_token_aqui>",
      "email": "User"
    }
    ```
  - Em caso de credenciais inválidas retorna 401 com `{ "error": "Invalid credentials" }`.

As contas atualmente disponíveis estão em memória (veja [`com.sensor.readings_api.auth.AuthService`](src/main/java/com/sensor/readings_api/auth/AuthService.java)).

Para acessar endpoints protegidos (por exemplo, `/api/readings`) adicione o header:
```
Authorization: Bearer <jwt_token_aqui>
```
ou configure o Authorization do Postman como Bearer Token com o token retornado.

A chave e tempo de expiração do JWT estão em [src/main/resources/application.properties](src/main/resources/application.properties):
```
jwt.secret=change_this_to_a_strong_secret_key_which_is_long_enough
jwt.expiration-ms=3600000
```
Substitua `jwt.secret` por uma chave forte antes de usar em produção.

## Endpoints Disponíveis

| Método | URL                  | Descrição                               |
| ------ | -------------------- | --------------------------------------- |
| POST   | `/api/auth/login`    | Login, retorna JWT e email              |
| POST   | `/api/readings`      | Insere ou atualiza uma leitura completa (protegido) |
| GET    | `/api/readings`      | Lista todas as leituras (protegido)     |
| GET    | `/api/readings/{id}` | Retorna a leitura pelo seu ID (protegido) |

## Testando com Postman

1. Importe [SensorReadingsAPI.postman_collection.json](SensorReadingsAPI.postman_collection.json).
2. Execute a request "Login" (POST `/api/auth/login`) e copie o campo `token` da resposta.
3. Nas requests protegidas configure o header:
   ```
   Authorization: Bearer {{token}}
   ```
   (ou use Authorization → Bearer Token no Postman)

Dica: na collection eu adiciono um script de teste que salva `token` em variável de ambiente automaticamente ao receber a resposta do login.

## GET — Exemplo de resposta (todas as leituras)

A resposta do endpoint GET `/api/readings` (quando há leituras) é um array de objetos Reading. Exemplo de resposta (JSON):

```json
[
    {
        "id": "12",
        "name": "Termometer 6738 Pro",
        "type": "Temperatura",
        "description": "Sensor de temperatura do ambiente da linha de produção.",
        "unit": "°C",
        "status": "OK",
        "statusDescription": "Funcionando normalmente.",
        "minValue": null,
        "maxValue": 23.6,
        "history": [
            22.8,
            23.2,
            23.5,
            23.7,
            23.6,
            23.7
        ],
        "value": null
    }
]
```

> Use o token retornado no login no header:
> Authorization: Bearer <jwt_token_aqui>

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

## Exemplo de Requisições cURL

* **Login (obter JWT)**

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"User","password":"000000"}'
```

* **GET** todas as leituras (use o token retornado)
```bash
curl -H "Authorization: Bearer <jwt_token>" http://localhost:8080/api/readings
```

## Coleção Postman

Importe o arquivo `SensorReadingsAPI.postman_collection.json` disponível na raiz do projeto para testar os endpoints no Postman.

## Observações

- Implementação de exemplo com senhas em texto e usuários em memória — adequada apenas para desenvolvimento/demonstração. Para produção, use armazenamento seguro e hashing de senhas.
- JWT é gerado em [`com.sensor.readings_api.auth.JwtUtil`](src/main/java/com/sensor/readings_api/auth/JwtUtil.java) e aplicado via filtro [`com.sensor.readings_api.auth.JwtFilter`](src/main/java/com/sensor/readings_api/auth/JwtFilter.java) e configuração [`com.sensor.readings_api.auth.SecurityConfig`](src/main/java/com/sensor/readings_api/auth/SecurityConfig.java).

## Integrantes do Grupo

* Alexandre Moreira da Silva Junior – RM 98621
* Fernando Borelli – RM 98343
* Giovanna Ferro Menis – RM 99639
* João Marco Oliveira Pereira – RM 97777
* Luiz Fernando Della Colette Pombo Lema – RM 558735
