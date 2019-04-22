const template = {
  person: function (person) {
    return `
      <div
        class='Person Flex'
        style='animation-delay: .${person.position}s'
      >
        <div class='Person__Photo'>
          <div
            class='Person__Image'
            style='background-image: url(${person.picture})'
            title='${person.name}'
          >
            <div class='Person__Position Bold'>
              ${person.position}
            </div>
          </div>
        </div>
  
        <div class='Flex'>
          <div class='Person__Text'>
            <div class='Person__Text--name'>
              ${person.name}
            </div>
  
            <div class='Person__Text--description'>
              ${person.description}
            </div>
  
            <div class='Tooltip Flex Bold Grow'>
                <div class='Tooltip__Percentage'>
                  <span>GOSTAM</span>
                  ${person.percPositive}%
                </div>
  
                <div class='Tooltip__Percentage'>
                  <span>NÃO GOSTAM</span>
                  ${person.percNegative}%
                </div>
              </div>
          </div>
        </div>
      </div>
    `;
  },

  empty: function() {
    return `
      <div class='Empty'>
        <div class='Empty__Title'>
          Puxa!
        </div>

        <div class='Empty__Text'>
          Nossos participantes não foram encontrados,
          acho que devem estar em algum desafio semanal,
          tente novamente mais tarde!
        </div>
      </div>
    `
  }
}

module.exports = template;