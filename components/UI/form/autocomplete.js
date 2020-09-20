import Autocomplete from 'react-autocomplete'
import { TextInput } from './textInput'

const AutocompleteComponent = ({ data, label, ...props }) => {
  return (
    <Autocomplete
      getItemValue={item => item[label]}
      items={data}
      shouldItemRender={(item, value) =>
        item[label].toLowerCase().indexOf(value.toLowerCase()) > -1
      }
      renderItem={(item, isHighlighted) => (
        <div
          key={item[label]}
          style={{ background: isHighlighted ? '#333' : '#fff' }}
        >
          {item[label]}
        </div>
      )}
      onChange={e => props.onChange(e.target.value)}
      onSelect={value => props.onChange(value)}
      menuStyle={{
        position: 'absolute',
        marginTop: '-2rem'
      }}
      renderInput={props => {
        return <TextInput {...props} />
      }}
      {...props}
    />
  )
};

export default AutocompleteComponent;
