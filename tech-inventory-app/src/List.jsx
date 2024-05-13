import PropTypes from 'prop-types';

function List({category= "Category", items= []}) {

  const itemCategory = category;
  // eslint-disable-next-line react/prop-types
  const itemList = items;

  // eslint-disable-next-line react/prop-types
  const listItems = itemList.map(item =>
    <li key={item.id}>
      {item.name}: &nbsp;
      <b>{item.calories}</b>
    </li>
  );

  return (
    <>
      <h3 className="list-category">{itemCategory}</h3>
      <ol className="item-items">{listItems}</ol>
    </>);

}
// Set the datatype of props as good practice for debugging incorrect data inputted
List.propTypes = {
  category: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string, calories: PropTypes.number })),
}

// In case the list is missing
// List.defaultProps = {
//   category: "Category",
//   items: [],
// }

export default List