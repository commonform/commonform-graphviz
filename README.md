```shellsession
npm i -g commonform-graphviz commonform-cli
cd project
# Convert .cform markup file to native JSON.
commonform render --format native < form.cform > form.json
# Create a GraphViz .dot file graphing defined terms.
commonform-graphviz-terms < form.json > terms.dot
# Render to PNG.
dot -Tpng terms.dot > terms.png
# Create a GraphViz .dot file graphing heading references.
commonform-graphviz-headings < form.json > headings.dot
# Render to PNG.
dot -Tpng headings.dot > headings.png
```
