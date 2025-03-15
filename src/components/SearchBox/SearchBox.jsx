import { useDispatch, useSelector } from 'react-redux';
import { setFilter, selectFilter } from '../../redux/filterSlice';
import css from './SearchBox.module.css';

function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <input
      className={css.input}
      type="text"
      value={filter}
      onChange={e => dispatch(setFilter(e.target.value))}
      placeholder="Search contacts..."
    />
  );
}

export default SearchBox;
