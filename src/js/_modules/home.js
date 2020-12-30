const Home = {
  init: () => {
    console.log('Loaded');

    $(".impressum").click(function () {
      $(".impressum-text").toggle();
      $("foreignObject").toggle();
  });
  }
};

export default Home;

