import { useState, useCallback } from "react";
import "./App.css";
import Component from "./components/component/Component";

function App() {
  const contacts = [
    {
      firstName: "Барней",
      lastName: "Стинсовський",
      phone: "+380956319521",
      gender: "male",
    },
    {
      firstName: "Робін",
      lastName: "Щербатська",
      phone: "+380931460123",
      gender: "female",
    },
    {
      firstName: "Анонімний",
      lastName: "Анонімус",
      phone: "+380666666666",
    },
    {
      firstName: "Лілія",
      lastName: "Олдровна",
      phone: "+380504691254",
      gender: "female",
    },
    {
      firstName: "Маршен",
      lastName: "Еріксонян",
      phone: "+380739432123",
      gender: "male",
    },
    {
      firstName: "Теодор",
      lastName: "Мотсбес",
      phone: "+380956319521",
      gender: "male",
    },
  ];
  const state = {
    contacts,
    filters: new Set(["female", "male", ""]),
  };
  const [stateNew, setArray] = useState(state);
  const handleSearchChange = (event) => {
    setArray(({ contacts, filters }) => {
      let valueFind = event.target.value;
      if (!valueFind) return state;
      filters.add(valueFind);
      contacts = contacts.filter(
        ({ firstName, lastName, phone }) =>
          firstName.toLowerCase().includes(valueFind.toLowerCase()) ||
          lastName.toLocaleLowerCase().includes(valueFind.toLowerCase()) ||
          phone.includes(valueFind)
      );
      return { contacts, filters };
    });
  };

  const handleFilterChange = useCallback(
    (event) => {
      setArray((previousState) => {
        let filters = new Set(previousState.filters);
        let contacts = state.contacts;

        if (event.target.checked) {
          filters.add(event.target.value);
        } else {
          filters.delete(event.target.value);
        }

        // if (filters.size) {
        contacts = contacts.filter((contact) => {
          return filters.has(
            contact.gender === undefined ? "" : contact.gender
          );
        });
        // }
        return {
          contacts,
          filters,
        };
      });
    },
    [setArray]
  );

  return (
    <div className="App">
      <h1>My contacts</h1>
      <div className="input_area">
        <label className="signup_input">
          <input
            type="text"
            name="message"
            placeholder="find name or number"
            onChange={handleSearchChange}
          />
        </label>
      </div>
      <div className="check-area">
        <fieldset className="checkbox">
          <legend>Check gender</legend>
          <label className="checkbox_input">
            <input
              type="checkbox"
              name="gender"
              onChange={handleFilterChange}
              value="male"
              defaultChecked={true}
            />
            male
          </label>
          <label className="checkbox_input">
            <input
              type="checkbox"
              name="gender"
              onChange={handleFilterChange}
              value="female"
              defaultChecked={true}
            />
            female
          </label>
          <label className="checkbox_input">
            <input
              type="checkbox"
              name="gender"
              onChange={handleFilterChange}
              value={undefined}
              defaultChecked={true}
            />
            undefined
          </label>
        </fieldset>
      </div>
      <ul className="contacts">
        {stateNew.contacts.map((elem) => (
          <Component {...elem}></Component>
        ))}
      </ul>
    </div>
  );
}

export default App;
