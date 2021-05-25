export class Logs {
    public id: number;
    public username: string;
    public fecha: Date;
    public accion: string;
    public detalle: string;
    public valorActual: object;
    public valorNuevo: object;

    constructor(item?: any) {
        this.id = item.id;
        this.username = item.username;
        this.fecha = item.fecha;
        this.accion = item.accion;
        this.detalle = item.detalle;
        this.valorActual = JSON.parse(item.valorActual);
        this.valorNuevo = JSON.parse(item.valorNuevo);
    }
}


