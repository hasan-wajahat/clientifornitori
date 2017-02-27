import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Movimento} from "../../../model/movimenti/movimento";

export class ModificaMovimentoForms {

  constructor() {

  }


  public static buildFormDatiMovimento(
                          movimentoDTO:Movimento,
                          fb: FormBuilder
                ): FormGroup {

    var formDatiMovimento:FormGroup = fb.group({
      'id': [movimentoDTO.id],
      'contoId': [movimentoDTO.contoId],
      'data': [movimentoDTO.data, Validators.required],
      'causale': [movimentoDTO.causale, Validators.required],
      'importo': [movimentoDTO.importo, Validators.required],
      'stato': [movimentoDTO.stato, Validators.required],
      'tipo': [movimentoDTO.tipo, Validators.required]
    });

    return formDatiMovimento;

  }

  public static formErrors = {
    'id': '',
    'contoId': '',
    'data': '',
    'causale': '',
    'importo': '',
    'stato': '',
    'tipo': ''
  };

  public static validationMessages = {
    'id': {'required':"Questo campo è obbligatorio."},
    'contoId': {'required':"Questo campo è obbligatorio."},
    'data': {'required':"Questo campo è obbligatorio."},
    'causale': {'required':"Questo campo è obbligatorio."},
    'importo': {'required':"Questo campo è obbligatorio."},
    'stato': {'required':"Questo campo è obbligatorio."},
    'tipo': {'required':"Questo campo è obbligatorio."}
  };

}
