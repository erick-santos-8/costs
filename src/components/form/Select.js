import styles from "./Select.module.css";
//A funcao map é um for mais enxuto
/*perceba que options veio como json, entao é feita uma busca pelo map e sao inseridas as opcoes
pela ordem, e seus valores e chaves sao armazenados*/ 
function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select name={name} id={name}>
        <option>Selecione uma opção</option>
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}        
      </select>
    </div>
  );
}

export default Select;
