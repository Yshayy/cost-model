docker_build(
  'cost-model',
  context='.',
)

k8s_yaml(listdir('kubernetes'))
k8s_resource('cost-model', links=['http://cost.localtest.me:8090'])
local_resource('ui', links=['http://localhost:8091'],serve_cmd='cd ui && npx parcel --host 0.0.0.0 -p 8091 src/index.html')