# organizador: UX e travamentos (2026-10-09)

Nota curta, sem post no devlog. Fonte: commit `bb6c306` no repo `sthevan027/organizador`.

## Instagram (post de feed, estilo nota curta)

Organizador: a janela travava em pasta com muitos arquivos. O motivo era a fila de log sendo drenada inteira de uma vez, num loop síncrono. Agora ela processa em lotes pequenos e devolve o controle pra interface entre um lote e outro.

Também: cabeçalho reorganizado (Organizador e Limpeza como ícones de navegação), seletor de tema claro/escuro isolado no canto, e o painel de Limpeza passou a acompanhar a troca de tema, o que antes não acontecia.

Código aberto no GitHub. Link na bio.

#python #devlog #opensource

## X / Twitter (até 280 caracteres)

organizador: a janela travava em pastas com muitos arquivos. A fila de log era drenada inteira num loop síncrono. Agora processa em lotes e devolve o controle pra UI entre um lote e outro. Também corrigi o painel de Limpeza, que não acompanhava o tema claro/escuro.
