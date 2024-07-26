document.addEventListener('DOMContentLoaded', () => {
    const model = new WhackAMoleModel();
    const view = new MoleGameView();
    const controller = new WhackAMoleController(model, view);

    view.setupBoard();
});
