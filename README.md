# 📝 Tarefas Locais - Today Do

Aplicativo de gerenciamento de tarefas com Angular, salvamento local e SweetAlert2 para confirmações.

![Preview](public/img/task-list-null.png)

## 🔗 Link

Aqui está o [link do projeto hospedado](http://today-do.vercel.app/) para acessar este gerenciador de tarefas.

## ✨ Funcionalidades

- ✅ Adicionar novas tarefas
- ✅ Editar tarefas já salvas
- ✅ Marcar/desmarcar como concluída
- ✅ Exclusão individual ou em massa
- 📱 Responsivo para mobile
- 💾 Autosalvamento no localStorage
- 🎨 Estilos customizados com SCSS
- 🚫 Confirmação para ações destrutivas

## 🛠️ Tecnologias

- Angular 20
- TypeScript
- SweetAlert2 (para pop-ups)
- SCSS
- Standalone Components

## 📦 Estrutura do Código

```bash
src/
├── app/
│   ├── components/
│   │   ├── add-new-task/  # Componente de adição
│   │   ├── empty-task/    # Estado vazio
│   │   └── task-list/     # Lista renderizada
│   ├── pages/
│   │   └── home/          # Página principal
│   └── interface/
│       └── task-item.interface.ts
├── assets/
└── styles/               # Variáveis SCSS globais
