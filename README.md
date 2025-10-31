# SPRINT-DigitalTwin-APP

Versão: 1.0.0

Aplicativo desenvolvido para visualização de sensores industriais, simulação de Digital Twin e monitoramento de dados em tempo real. O projeto utiliza [Expo](https://expo.dev) e React Native, com navegação baseada em arquivos e integração com um backend via API REST protegida por JWT.

## Integrantes

- Giovanna Ferro Menis — RM: 99639  
- Fernando Borelli — RM: 98343  
- Luiz Fernando Della Colette Pombo Lema — RM: 558735  
- João Marco Oliveira Pereira — RM: 97777  
- Alexandre Moreira da Silva Junior — RM: 98621  

## Funcionalidades

- Login de usuário (via backend, JWT)
- Visualização de lista de sensores e detalhes individuais
- Visualização de gráficos históricos dos sensores
- Menu principal e tela de configurações
- Logout e troca de usuário
- Interface responsiva e navegação por abas

## Como rodar o projeto

1. Instale as dependências:
```bash
npm install
```

2. Inicie o projeto:
```bash
npx expo start
```

3. Execute no emulador/simulador:
- Android: pressione `a` no terminal do Expo ou use o botão "Run on Android".
- iOS (macOS): pressione `i` no terminal do Expo ou use o simulador.
- Web: pressione `w` no terminal do Expo.

## Login

A autenticação é feita pelo backend que retorna um objeto JSON com `email` e `token` (JWT). O token é armazenado localmente e usado automaticamente nas requisições através do cliente HTTP configurado em [`service/auth.service.ts`](service/auth.service.ts) — veja a função [`loginRequest`](service/auth.service.ts).

Exemplo de resposta de login:
```json
{
  "email": "User",
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

Usuários de exemplo (para testar com o backend):
- Giovanna — 99639  
- Fernando — 98343  
- Luiz — 558735  
- João — 97777  
- Alexandre — 98621  
- Convidado — 123456

> Observação: a lista acima são usuários de exemplo que podem existir no backend de desenvolvimento. O app agora depende da API configurada em [`environment/environment.ts`](environment/environment.ts) — variável `apiUrl`.

## Integração com o backend

- Autenticação e armazenamento do JWT: [`service/auth.service.ts`](service/auth.service.ts) — [`loginRequest`](service/auth.service.ts), [`getUserEmail`](service/auth.service.ts)
- Wrappers de usuário: [`service/users.service.ts`](service/users.service.ts) — [`loginBackend`](service/users.service.ts), [`currentUserEmail`](service/users.service.ts)
- Leitura de sensores: [`service/sensors.service.ts`](service/sensors.service.ts) — [`getReadings`](service/sensors.service.ts), [`getReadingById`](service/sensors.service.ts)

## Estrutura do Projeto

- `app/` — Telas e rotas do aplicativo
- `components/` — Componentes reutilizáveis (UI, gráficos, etc)
- `constants/` — Constantes globais (cores, etc)
- `hooks/` — Hooks customizados
- `assets/` — Imagens e fontes
- `service/` — Comunicação com o backend (autenticação e endpoints)

## Observações

- O app faz chamadas reais ao backend configurado em `environment.apiUrl` e utiliza JWT para rotas protegidas.
- Depois do login, o token JWT e o email do usuário são salvos localmente; o token é enviado automaticamente nas requisições feitas por [`authApi`](service/auth.service.ts).
- Para redefinir o projeto para o estado inicial, execute:
```bash
npm run reset-project
```

## Pré-requisitos e configuração do backend

- Rode o backend antes de abrir o app: o frontend depende de uma API REST que fornece autenticação (JWT) e endpoints de leitura de sensores. Inicie o servidor do backend conforme as instruções do repositório do backend (por exemplo `npm start`, `node server.js`, `dotnet run`, etc.).
- Verifique a URL da API no arquivo `environment/environment.ts` (variável `apiUrl`) e atualize-a caso o backend não esteja na URL padrão. Exemplo de alteração:

```ts
// environment/environment.ts
export const environment = {
  apiUrl: 'http://000.000.0.0:8080', // ajuste para o IP/porta do seu backend (ou deixe localhost)
};
```

- Backend e frontend devem estar na mesma rede (por exemplo mesma LAN) ou o backend deve estar acessível por um endereço público/servidor. Se estiver testando com um emulador, atente-se a usar o IP correto (e/ou configurar encaminhamento/port forwarding quando aplicável).

- Se usar um dispositivo físico (celular/tablet) conecte-o à mesma rede Wi‑Fi que a máquina que roda o backend ou use um servidor acessível pela Internet.

## Verificação rápida

1. Inicie o backend.
2. Confirme que `environment.environment.ts` (ou sua configuração equivalente) aponta para a URL correta do backend.
3. Abra o app (`npx expo start`) e faça login com um usuário válido. Após login, você deve ser redirecionado para o menu e conseguir ver a lista de sensores (caso o backend tenha dados).

## Observação sobre os exemplos de login

A lista de usuários mostrada acima é apenas um conjunto de exemplos para testes — o app realiza autenticação real contra o backend e não usa mocks. Se precisar, confirme credenciais válidas no backend de desenvolvimento.
