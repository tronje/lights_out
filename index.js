/**
 *  Save important div-items in Variables
 */
var btn_home = document.getElementById('home');
var btn_stuff = document.getElementById('stuff');
var btn_about = document.getElementById('about');
var btn_like = document.getElementById('like');

/**
 *  Initilizes the site to show "Home" on loading
 */
window.onload = showHome;

/**
 *  Defines, what Button-Divs do
 */
btn_home.onclick = showHome;
btn_stuff.onclick = showStuff;
btn_about.onclick = showAbout;

btn_like.onclick = likeThis;

/**
 *  Hides all menu-controled items
 */
function hideAll () {
  document.getElementById("content_home").style.display = 'none';
  document.getElementById("content_stuff").style.display = 'none';
  document.getElementById("content_about").style.display = 'none';
}

/**
 *  Shows only the Home item
 */
function showHome () {
  hideAll();
  document.getElementById("content_home").style.display = '';
}

/**
 *  Shows the Stuff item
 */
function showStuff () {
  hideAll();
  document.getElementById("content_stuff").style.display = '';
}

/**
 *  Shows the About item
 */
function showAbout () {
  hideAll();
  document.getElementById("content_about").style.display = '';
}

/**
 *  Triggers the alert "Thanks!"
 */
function likeThis () {
  alert('Thanks!')
}