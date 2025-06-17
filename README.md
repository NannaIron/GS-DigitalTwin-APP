# Digital Twin - Sensor Viewer

Aplicativo desenvolvido para visualização de sensores industriais, simulação de Digital Twin e monitoramento de dados em tempo real. O projeto utiliza [Expo](https://expo.dev) e React Native, com navegação baseada em arquivos e simulação de dados mockados.

## Integrantes

- Giovanna Ferro Menis — RM: 99639  
- Fernando Borelli — RM: 98343  
- Luiz Fernando Della Colette Pombo Lema — RM: 558735  
- João Marco Oliveira Pereira — RM: 97777  
- Alexandre Moreira da Silva Junior — RM: 98621  

## Funcionalidades

- Login de usuário (mock)
- Visualização de lista de sensores e detalhes individuais
- Visualização de gráficos históricos dos sensores
- Menu principal e tela de configurações
- Logout e troca de usuário
- Interface responsiva e navegação por abas

## Como rodar o projeto

### 1. Instale as dependências

```bash
npm install
```

### 2. Inicie o projeto

```bash
npx expo start
```

### 3. Execute no emulador/simulador

- **Android:**  
  Conecte um dispositivo ou inicie um emulador Android, então pressione `a` no terminal do Expo ou clique em "Run on Android device/emulator".
- **iOS:**  
  No macOS, pressione `i` no terminal do Expo ou clique em "Run on iOS simulator" (Xcode necessário).
- **Web:**  
  Pressione `w` no terminal do Expo ou clique em "Run in web browser".

### 4. Login

Utilize um dos usuários mockados em [`mock/users.json`](mock/users.json):

| Usuário    | Senha  |
|------------|--------|
| Giovanna   | 99639  |
| Fernando   | 98343  |
| Luiz       | 558735 |
| João       | 97777  |
| Alexandre  | 98621  |
| Convidado  | 123456 |

## Estrutura do Projeto

- `app/` — Telas e rotas do aplicativo
- `components/` — Componentes reutilizáveis (UI, gráficos, etc)
- `constants/` — Constantes globais (cores, etc)
- `hooks/` — Hooks customizados
- `mock/` — Dados simulados (sensores, usuários, configurações)
- `assets/` — Imagens e fontes

## Observações

- O backend é simulado via arquivos JSON em [`mock/`](mock/).
- Para redefinir o projeto para o estado inicial, execute:
  ```bash
  npm run reset-project
  ```
