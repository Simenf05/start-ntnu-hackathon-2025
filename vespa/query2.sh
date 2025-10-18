#!/bin/bash

/home/simen/Downloads/vespa-cli_8.589.18_linux_amd64/bin/vespa query \
    "yql=select * from product.product where userQuery() OR ({targetHits: 10}nearestNeighbor(embedding, q_emb))"\
    "query=kjøtt" \
    "input.query(q_emb)=embed(@query)" \
    "ranking.profile=product_search" \
    | less

