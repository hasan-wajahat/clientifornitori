import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CliFor} from "../../../model/clientifornitori/CliFor";

export class ModificaClienteFornitoreForms {

  constructor() {

  }


  public static buildFormDatiClienteFornitore(
                          cliForDTO:CliFor,
                          fb: FormBuilder
                ): FormGroup {

    var formDatiClienteFornitore:FormGroup = fb.group({
      'id':                       [cliForDTO.id],
      'userId':                   [cliForDTO.userId],
      'denominazione':			      [cliForDTO.denominazione, Validators.required],
      'tipo':                     [cliForDTO.tipo],
      'tipoCF':                   [cliForDTO.tipoCF],
      'stato':                    [cliForDTO.stato],
      'codiceFiscale':            [cliForDTO.codiceFiscale, [ Validators.required, Validators.minLength(16), Validators.maxLength(17)]],
      'partitaIVA':               [cliForDTO.partitaIVA, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      'ragioneSociale':           [cliForDTO.ragioneSociale, Validators.required],
      'cognome':                  [cliForDTO.cognome, Validators.required],
      'nome':                     [cliForDTO.nome, Validators.required],
      'dataNascita':              [cliForDTO.dataNascita, Validators.required],
      'luogoNascita':             [cliForDTO.luogoNascita, Validators.required],
      'indirizzo':                [cliForDTO.indirizzo, Validators.required],
      'cap':                      [cliForDTO.cap, [Validators.required, Validators.pattern("[0-9]{5}")]],
      'citta':                    [cliForDTO.citta, Validators.required],
      'provincia':                [cliForDTO.provincia, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      'nazione':                  [cliForDTO.nazione, Validators.required],
      'telefono':                 [cliForDTO.telefono],
      'email':                    [cliForDTO.email],
      'postaCertificata':         [cliForDTO.postaCertificata],
      'cellulare':                [cliForDTO.cellulare],
      'fax':                      [cliForDTO.fax],
      'codiciIVA':                [cliForDTO.codiciIVA, Validators.pattern('^[0-9]*$')],
      'terminiPagamento':         [cliForDTO.terminiPagamento, Validators.required],
      'tipoTerminiPagamento':     [cliForDTO.tipoTerminiPagamento, Validators.required],
    });

    return formDatiClienteFornitore;

  }


  public static formErrors = {
    'id': '',
    'userId': '',
    'denominazione': '',
    'intestazioneCognomeNome': '',
    'codiceFiscale': '',
    'partitaIVA': '',
    'pIvaCf': '',
    'cognome': '',
    'nome': '',
    'dataNascita': '',
    'luogoNascita': '',
    'indirizzo': '',
    'cap': '',
    'citta': '',
    'provincia': '',
    'regione': '',
    'nazione': '',
    'telefono': '',
    'email': '',
    'postaCertificata': '',
    'cellulare': '',
    'fax': '',
    'voceAcquisto': '',
    'codiciIVA': '',
    'terminiPagamento': '',
    'tipoTerminiPagamento': '',
    'tipoCF': '',
    'stato': '',
    'insUser': '',
    'modUser': '',
    'ragioneSociale': ''
  };

  public static validationMessages = {
    'id': '',
    'userId': '',
    'denominazione':            {'required':"Questo campo è obbligatorio."},
    'intestazioneCognomeNome':  {'required':"Questo campo è obbligatorio."},
    'codiceFiscale':            {'required':"Questo campo è obbligatorio.", 'minlength':"Il codice fiscale deve avere almeno 16 caratteri.", 'maxlength':"Il codice fiscale non può avere più di 17 caratteri."},
    'partitaIVA':               {'required':"Questo campo è obbligatorio.", 'minlength':"La partita iva deve avere 11 caratteri.", 'maxlength':"La partita iva deve avere 11 caratteri."},
    'pIvaCf':                   {'required':"Questo campo è obbligatorio."},
    'cognome':                  {'required':"Questo campo è obbligatorio."},
    'nome':                     {'required':"Questo campo è obbligatorio."},
    'dataNascita':              {'required':"Questo campo è obbligatorio."},
    'luogoNascita':             {'required':"Questo campo è obbligatorio."},
    'indirizzo':                {'required':"Questo campo è obbligatorio."},
    'cap':                      {'required':"Questo campo è obbligatorio.", 'pattern':"CAP non valido."},
    'citta':                    {'required':"Questo campo è obbligatorio."},
    'provincia':                {'required':"Questo campo è obbligatorio.", 'minlength':"La provincia deve avere 2 caratteri.", 'maxlength':"La provincia deve avere 2 caratteri."},
    'regione':                  {'required':"Questo campo è obbligatorio."},
    'nazione':                  {'required':"Questo campo è obbligatorio."},
    'telefono':                 {'required':"Questo campo è obbligatorio."},
    'email':                    {'required':"Questo campo è obbligatorio."},
    'postaCertificata':         {'required':"Questo campo è obbligatorio."},
    'cellulare':                {'required':"Questo campo è obbligatorio."},
    'fax':                      {'required':"Questo campo è obbligatorio."},
    'voceAcquisto':             {'required':"Questo campo è obbligatorio."},
    'codiciIVA':                {'pattern':"Questo campo è obbligatorio."},
    'terminiPagamento':         {'required':"Questo campo è obbligatorio."},
    'tipoTerminiPagamento':     {'required':"Questo campo è obbligatorio."},
    'tipoCF':                   {'required':"Questo campo è obbligatorio."},
    'stato':                    {'required':"Questo campo è obbligatorio."},
    'insUser':                  {'required':"Questo campo è obbligatorio."},
    'modUser':                  {'required':"Questo campo è obbligatorio."},
    'ragioneSociale':           {'required':"Questo campo è obbligatorio."}
  };

}
