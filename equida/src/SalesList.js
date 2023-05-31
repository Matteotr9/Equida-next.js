


import React, { useState, useEffect } from 'react';
import VenteDetails from './VenteDetails';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [selectedVente, setSelectedVente] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1/Equida-Spa2/public/api/vente/lister') // Remplacez l'URL par l'URL de votre API
      .then(response => response.json())
      .then(data => setSales(data))
      .catch(error => console.log(error));
  }, []);

  const handleVenteClick = venteId => {
    const selectedVente = sales.find(vente => vente.id === venteId);
    setSelectedVente(selectedVente);
  };

  return (
    <div>
      <h1>Liste des ventes</h1>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Catégorie de Vente</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(vente => (
            <tr key={vente.id} onClick={() => handleVenteClick(vente.id)}>
              <td>{vente.nom}</td>
              <td>{formatDate(vente.dateDebut)}</td>
              <td>{formatDate(vente.dateFin)}</td>
              <td>{vente.categorieDeVentes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedVente && <VenteDetails vente={selectedVente} />}
    </div>
  );
};

const formatDate = date => {
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString(undefined, options);
  return formattedDate;
};

export default SalesList;