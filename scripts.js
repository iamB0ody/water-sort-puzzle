(function () {
  let colors = [
    "FF0000",
    "00FF00",
    "0000FF",
    "FFFF00",
    "00FFFF",
    "FF00FF",
    "C0C0C0",
    "800000",
  ];
  let selected;
  generateAllColor();
  setBgColorToCups();
  $(".cup").click(function () {
    removeSelection();
    if (selected) {
      move(selected, this);
      selected = undefined;
    } else {
      selected = this;
      $(this).addClass("selected");
    }
  });

  function generateAllColor() {
    const colorsClone = [...colors];
    colors = [];
    colors = colorsClone.flatMap((i) => Array.from({ length: 4 }).fill(i));
    colors = shuffleColors(colors);
  }

  function shuffleColors(colors) {
    return colors.sort(() => (Math.random() > 0.5 ? 1 : -1));
  }

  function setBgColorToCups() {
    [...$(".block")].map((b, i) => {
      $(b).css("background-color", gColor(i));
    });
  }

  function gColor(i) {
    return "#" + colors[i];
    // return "#" + colors[Math.floor(Math.random() * 8)];
  }

  function removeSelection() {
    [...$(".cup")].map((b, i) => {
      $(b).removeClass("selected");
    });
  }

  function move(fromEl, toEl) {
    // Select block
    const fromBlock = $(fromEl).find(":first-child");
    // Validate
    if (validate(fromEl, toEl, fromBlock)) {
      // Remove all selections
      removeSelection();
      // Remove block
      fromBlock.remove();
      // Move block
      $(toEl).prepend(fromBlock);
    }
  }

  function validate(fromEl, toEl, fromBlock) {
    const toBlock = $(toEl).find(":first-child");
    const notTheSameCup = fromEl !== toEl;
    const notFull = $(toEl).children().length < 4;
    const fromBlockBg = $(fromBlock).css("backgroundColor");
    const toBlockBg = $(toBlock).css("backgroundColor");
    const colorMatch = fromBlockBg === toBlockBg || toBlockBg === undefined;
    return notTheSameCup && notFull && colorMatch;
  }
})();
