export default interface PanelChangeEvent {
    panelId: string;
    nextState: boolean;
    preventDefault: () => void;
}
