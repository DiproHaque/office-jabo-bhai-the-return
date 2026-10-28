import base64,glob,os,sys
root=os.path.dirname(os.path.abspath(__file__))
src=os.path.join(root,'src')
head=open(os.path.join(src,'00_head.html')).read()
fd=os.path.join(root,'node_modules/@fontsource')
def face(fam,file,weight,rng):
    b=base64.b64encode(open(os.path.join(fd,file),'rb').read()).decode()
    return "@font-face{font-family:'%s';font-style:normal;font-weight:%d;font-display:swap;src:url(data:font/woff2;base64,%s) format('woff2');unicode-range:%s}"%(fam,weight,b,rng)
BEN='U+0964-0965,U+0980-09FE,U+1CF7,U+1CFA,U+200C-200D,U+20B9,U+25CC'
LAT='U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
fonts=[]
for w in (400,700):
    fonts.append(face('Hind Siliguri','hind-siliguri/files/hind-siliguri-bengali-%d-normal.woff2'%w,w,BEN))
    fonts.append(face('Hind Siliguri','hind-siliguri/files/hind-siliguri-latin-%d-normal.woff2'%w,w,LAT))
for w in (800,):
    fonts.append(face('Baloo Da 2','baloo-da-2/files/baloo-da-2-bengali-%d-normal.woff2'%w,w,BEN))
    fonts.append(face('Baloo Da 2','baloo-da-2/files/baloo-da-2-latin-%d-normal.woff2'%w,w,LAT))
head=head.replace('/*@FONTS@*/','\n'.join(fonts))
three=open(os.path.join(root,'node_modules/three/build/three.min.js')).read()
bgu=open(os.path.join(root,'node_modules/three/examples/js/utils/BufferGeometryUtils.js')).read()
js=''.join(open(f).read()+'\n' for f in sorted(glob.glob(os.path.join(src,'*.js'))))
sfx={os.path.splitext(os.path.basename(f))[0]:base64.b64encode(open(f,'rb').read()).decode() for f in sorted(glob.glob(os.path.join(root,'sfx','*.mp3')))}
js="'use strict';\n/* sound effects: CC0 (Kenney.nl, public-domain packs) */\nconst SFX_DATA="+__import__('json').dumps(sfx)+';\n'+js
open(os.path.join(root,'game.js'),'w').write(js)
body=head+'\n<script>LP(18,"শহরের নকশা আসছে…")</script>\n<script>\n'+three+'\n</script>\n<script>LP(42,"বাস-রিকশা রেডি হচ্ছে…")</script>\n<script>\n'+bgu+'\n</script>\n<script>\n'+js+'</script>\n'
os.makedirs(os.path.join(root,'dist'),exist_ok=True)
import shutil
if os.path.isdir(os.path.join(root,'audio')):shutil.copytree(os.path.join(root,'audio'),os.path.join(root,'dist','audio'),dirs_exist_ok=True)
open(os.path.join(root,'dist','artifact.html'),'w').write(body)
title_end=body.index('</style>')+len('</style>')
standalone=('<!doctype html>\n<html lang="bn">\n<head>\n<meta charset="utf-8">\n'
 '<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">\n'
 +body[:title_end]+'\n</head>\n<body>\n'+body[title_end:]+'</body>\n</html>\n')
open(os.path.join(root,'dist','index.html'),'w').write(standalone)
print('ok',len(standalone)//1024,'KB')
