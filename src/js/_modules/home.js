const Home = {
  init: () => {
    console.log('Loaded');

    $(".impressum").click(function () {
      $(".impressum-text").toggle();
      $(".impressum-text-content").toggle();
      $("foreignObject").toggle();
    });
  }
};

export default Home;

