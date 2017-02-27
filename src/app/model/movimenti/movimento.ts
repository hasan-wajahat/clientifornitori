export class Movimento {
  id: number
  scdId: number
  venId: number
  acqId: number
  corId: number
  contoId: number
  cliForId: number
  data: string
  causale: string
  importo: number
  stato: string
  tipoMovimento: string
  tipo: string

  corrispettivo: any = {}
  purchase: any = {}
  sale: any = {}


  // LABELS
  entrate: number
  uscite: number
  statoLabel: string
  
  buildLabels() {
    if (this.tipo == 'ENTRATA'){
      this.entrate = this.importo
    } else if (this.tipo == 'USCITA') {
      this.uscite = this.importo
    }
    if (this.stato == 'INTERNO'){
      this.statoLabel = 'Interno'
    } else if (this.stato == 'BANCA') {
      this.statoLabel = 'Banca'
    }
  }

  hasCorrispettivo() {
    return Object.keys(this.corrispettivo).length !== 0
  }

  hasPurchase() {
    return Object.keys(this.purchase).length !== 0
  }

  hasSale() {
    return Object.keys(this.sale).length !== 0
  }
}
