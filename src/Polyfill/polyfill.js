import atob from 'atob';
import btoa from 'btoa';

if (!('atob' in window)) {
    window.atob = atob;
}
if (!('btoa' in window)) {
    window.btoa = btoa;
}
