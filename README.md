# svgcreator

# Projeto SVG Generator

**Autor:** Rodrigo Veiga

## Descrição

Aplicação em Angular 18 para a geração de Retângulos e Estrelas em SVG

### Funcionalidades

- Adição de dois tipos de elementos: retângulos e estrelas.
- Painel individual de propriedades.
- Propriedades editáveis do retângulo: x, y, largura, altura, curvas, cores (interna e bordas) e espessura da borda.
- Propriedades editáveis da estrela: x, y, raio interno, raio externo, número de pontas, profundidade, cores (interna e bordas) e espessura da borda.
- Edição e remoção dos elementos clicados.
- Destaque para o elemento selecionado.
- Posição do elemento por meio de click na tela (ou digitação).
- Abas para cada um dos tipos de elementos.
- Botão para limpar a tela.

### Arquitetura

- Um componente para a tela
- Um componente para o menu
- Um serviço injetado no menu e na tela de desenho para facilitar a troca de informações
- Menu vertical para dar mais espaço para os desenhos
- Abas para cada um dos elementos, deixando o usuário focado apenas no que estiver inserindo/editando

### TODO

- Testes
- Responsividade
- Persistência
- Refatorar métodos semelhantes para reduzir duplicação de código

### Requisitos

- Node.js: v20+
- Angular CLI: v18+

## Instalação e Execução

- Clone o repositório
```bash
https://github.com/rodrigosnape/svgcreator.git
```
- Instale a última versão do Node 20
```bash
nvm install 20
nvm use 20
```
- Instale as dependências
```bash
npm install
```
- Para executar, digite
```bash
ng serve -o
```

## Demonstração

https://rodrigoveiga.com.br/sandbox/svgcreator/







